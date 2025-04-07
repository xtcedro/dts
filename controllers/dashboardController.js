export const getDashboardOverview = (req, res) => {
  res.status(200).json({
    welcomeMessage: "Welcome to the Admin Dashboard!",
    contentSections: [
      { label: "➕ Add Blog Post", link: "add-blog.html" },
      { label: "✏️ Edit Blog Posts", link: "edit-blogs.html" },
      { label: "📅 Manage Appointments", link: "manage-appointments.html" },
    ],
    systemTools: [
      { label: "📊 View Site Analytics", link: "site-analytics.html" },
      { label: "📨 User Messages", link: "user-messages.html" },
      { label: "⚙️ Site Settings", link: "settings.html" },
    ]
  });
};