exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => { 
  pgm.dropTable('authentications');
};
