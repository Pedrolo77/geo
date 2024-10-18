module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS geolocalizacion;');

    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identificador: {
        type: Sequelize.STRING,
        allowNull: false
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idScope: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, 
    {
      schema: "geolocalizacion",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('geolocalizacion.Devices');
    await queryInterface.sequelize.query('DROP SCHEMA IF EXISTS geolocalizacion;');
  }
};
