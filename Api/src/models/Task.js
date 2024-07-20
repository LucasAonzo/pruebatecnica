const { DataTypes } = require("sequelize");

// Cada tarea debe mostrar el título, descripción, fecha de creación y estado
// (completada o pendiente).
// o Debe haber una opción para marcar cada tarea como completada o
// pendiente.
// o Debe haber una opción para eliminar cada tarea (solo administradores).

module.exports = (sequelize) => {
  return sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      due: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
