export const getDashboardOverview = (req, res) => {
  res.status(200).json({
    message: "Welcome to the Admin Dashboard!",
    content: [
      "Manage Content",
      "Track Performance",
      "Customize AI Web Presence"
    ],
    tools: [
      "Analytics",
      "User Messages",
      "Settings"
    ]
  });
};