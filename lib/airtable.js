const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: `${process.env.AIRTABLE_API_KEY}`,
});
const base = Airtable.base(`${process.env.AIRTABLE_BASE_NAME}`);
const table = base("Table 1");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));s
};

export { table, getMinifiedRecords };
