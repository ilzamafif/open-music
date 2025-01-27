exports.shorthands = undefined;
exports.up = pgm => {
  pgm.addColumn('songs', {
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropColumn('songs', 'owner');
};