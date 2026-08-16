import { getLeadsToAnonymize, anonymizeLead } from "../src/lib/server/retention";

async function runRetentionReport() {
  console.log("Running retention policy report...");
  const leads = await getLeadsToAnonymize();
  
  console.log(`Found ${leads.length} leads older than 1 year.`);
  
  for (const lead of leads) {
    console.log(`- ${lead.firstName} ${lead.lastName} (${lead.email}) created at ${lead.createdAt.toISOString()}`);
  }

  // To actually run anonymization, we would accept a --run flag, but for now just reporting
  const isRun = process.argv.includes("--run");
  
  if (isRun) {
    console.log("\nExecuting anonymization...");
    for (const lead of leads) {
      await anonymizeLead(lead.id);
      console.log(`Anonymized lead ID: ${lead.id}`);
    }
    console.log("Anonymization complete.");
  } else {
    console.log("\nRun with --run to execute anonymization.");
  }
}

runRetentionReport()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
