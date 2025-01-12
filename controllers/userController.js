export const getAllUser = async (req, res) => {
  res.status(200).json("all users");
};

export const getSingleUser = async (req, res) => {
  res.status(200).json("single user");
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json("current user");
};

export const updateUser = async (req, res) => {
  res.status(200).json("update user");
};

export const updateUserPassword = async (req, res) => {
  res.status(200).json("updateUserPassword");
};
