import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.campaign.upsert({
    where: { key: "phase-1-demo-campaign" },
    update: { name: "Phase 1 demo campaign", status: "draft" },
    create: {
      key: "phase-1-demo-campaign",
      name: "Phase 1 demo campaign",
      status: "draft",
    },
  });

  await prisma.contentEntry.upsert({
    where: { slug: "phase-1-demo-content" },
    update: { title: "Phase 1 demo content", body: "Placeholder content for local development.", status: "draft" },
    create: {
      slug: "phase-1-demo-content",
      title: "Phase 1 demo content",
      body: "Placeholder content for local development.",
      status: "draft",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
