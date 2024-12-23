export default {
  mongodb: {
    url: "mongodb://localhost:27017/medhub",
  },

  migrationsDir: "./dist/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".cjs",
  useFileHash: false,
  moduleSystem: 'commonjs',
};
