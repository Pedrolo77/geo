module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS geolocalizacion;');

    await queryInterface.createTable('Paradas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
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

    await queryInterface.createTable('Rutas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      puntos: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('geolocalizacion.Rutas');
    await queryInterface.dropTable('geolocalizacion.Paradas');
    await queryInterface.sequelize.query('DROP SCHEMA IF EXISTS geolocalizacion;');
  }
};
