module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS geolocalizacion;');

    await queryInterface.createTable('trazas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chapa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitud: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      longitud: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('geolocalizacion.trazas');
    await queryInterface.sequelize.query('DROP SCHEMA IF EXISTS geolocalizacion;');
  }
};
