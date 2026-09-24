// Seeds the database with the site's original content (converted from the
// old src/content/*.js files) and, on first run, one admin user so someone
// can log into the dashboard. Safe to re-run: it only fills in content
// blocks that don't already exist, so it never clobbers edits made through
// the dashboard.
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

import * as siteInfoModule from './seed-content/siteInfo.js';
import * as homeModule from './seed-content/home.js';
import * as navigationModule from './seed-content/navigation.js';
import * as footerModule from './seed-content/footer.js';
import * as competitorsModule from './seed-content/competitors.js';
import * as spectatorsModule from './seed-content/spectators.js';
import * as danceStylesModule from './seed-content/danceStyles.js';
import * as contactModule from './seed-content/contact.js';
import * as ourHistoryModule from './seed-content/ourHistory.js';
import * as pastEventsModule from './seed-content/pastEvents.js';
import * as mustangballModule from './seed-content/mustangball.js';

const prisma = new PrismaClient();

function yearBlocks(mod) {
  return Object.fromEntries(
    Object.entries(mod).filter(([key]) => /^year\d{4}$/.test(key))
  );
}

const contentBlocks = {
  siteInfo: siteInfoModule.default,
  home: {
    hero: homeModule.hero,
    promoCard: homeModule.promoCard,
    introHtml: homeModule.introHtml,
    milestoneParagraph: homeModule.milestoneParagraph,
    quickLinksCtaLabel: homeModule.quickLinksCtaLabel,
    quickLinks: homeModule.quickLinks,
  },
  navigation: {
    mainNavLinks: navigationModule.mainNavLinks,
    navCta: navigationModule.navCta,
    footerNavLinks: navigationModule.footerNavLinks,
  },
  footer: {
    aboutHeading: footerModule.aboutHeading,
    aboutBefore: footerModule.aboutBefore,
    aboutLinkText: footerModule.aboutLinkText,
    aboutAfter: footerModule.aboutAfter,
    exploreHeading: footerModule.exploreHeading,
    eventInfoHeading: footerModule.eventInfoHeading,
    hostedByLine: footerModule.hostedByLine,
    footerSocialLinks: footerModule.footerSocialLinks,
  },
  competitors: {
    intro: competitorsModule.intro,
    buttons: competitorsModule.buttons,
    events: competitorsModule.events,
    eligibility: competitorsModule.eligibility,
    registrationAndFees: competitorsModule.registrationAndFees,
    cancellationsAndRefunds: competitorsModule.cancellationsAndRefunds,
    formationTeam: competitorsModule.formationTeam,
    shoeAndCostumePolicy: competitorsModule.shoeAndCostumePolicy,
    disclaimersHtml: competitorsModule.disclaimersHtml,
  },
  spectators: {
    ticketTiers: spectatorsModule.ticketTiers,
    ticketPriceColumns: spectatorsModule.ticketPriceColumns,
    ticketPriceRows: spectatorsModule.ticketPriceRows,
    afterPrices: spectatorsModule.afterPrices,
    guide: spectatorsModule.guide,
    faq: spectatorsModule.faq,
  },
  danceStyles: {
    danceStyleColumns: danceStylesModule.danceStyleColumns,
    danceStyleRows: danceStylesModule.danceStyleRows,
  },
  contact: {
    intro: contactModule.intro,
    form: contactModule.form,
    statusMessages: contactModule.statusMessages,
    online: contactModule.online,
    socialLinks: contactModule.socialLinks,
  },
  ourHistory: {
    eyebrow: ourHistoryModule.eyebrow,
    intro: ourHistoryModule.intro,
    milestones: ourHistoryModule.milestones,
    press: ourHistoryModule.press,
    outroBefore: ourHistoryModule.outroBefore,
    outroLinkText: ourHistoryModule.outroLinkText,
    outroAfter: ourHistoryModule.outroAfter,
  },
  pastEvents: pastEventsModule.default,
  mustangball: yearBlocks(mustangballModule),
};

async function seedContent() {
  for (const [key, data] of Object.entries(contentBlocks)) {
    const existing = await prisma.contentBlock.findUnique({ where: { key } });
    if (existing) {
      console.log(`content block "${key}" already exists, skipping`);
      continue;
    }
    await prisma.contentBlock.create({ data: { key, data } });
    console.log(`seeded content block "${key}"`);
  }
}

// Ensures SEED_ADMIN_EMAIL is allow-listed as an admin. There's no
// password to set — sign-in is GitHub OAuth, so this just creates (or
// re-activates/promotes) the row that lets that email in.
// Safe to leave set permanently and re-run on every deploy.
async function seedAdminUser() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const name = process.env.SEED_ADMIN_NAME || 'Admin';

  if (!email) {
    console.log('SEED_ADMIN_EMAIL not set, skipping admin allow-list seed');
    return;
  }

  const normalizedEmail = email.toLowerCase();
  await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: { role: 'admin', isActive: true },
    create: { email: normalizedEmail, name, role: 'admin' },
  });
  console.log(`ensured admin allow-list entry for "${normalizedEmail}"`);
}

async function main() {
  await seedContent();
  await seedAdminUser();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
