const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_city: {
      type: DataTypes.STRING,
    },
    address_street: {
      type: DataTypes.STRING,
    },
    address_number: {
      type: DataTypes.INTEGER,
    },
    address_zipcode: {
      type: DataTypes.STRING,
    },
    address_geolocation_lat: {
      type: DataTypes.FLOAT,
    },
    address_geolocation_long: {
      type: DataTypes.FLOAT,
    },
    phone: {
      type: DataTypes.STRING,
    },
  });

  return User;
};

export default user;
