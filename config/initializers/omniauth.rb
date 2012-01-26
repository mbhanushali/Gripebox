Rails.application.config.middleware.use OmniAuth::Builder do
#  if Rails.env == 'production'
    provider :twitter, '2KM9g9xheM0IOClkWioxw', 'vchl69mJPLQxa6rYXUidq3nLJyHDvNNW0RHyez4gA'
    provider :facebook, '292822210738107', '9822dc415bf97f509ba41c689628a906'
#  else
#    provider :twitter, 'aYSqTba7BZ340ZiC6nXULA', '7FzoCFhIAwvVBPvb1Pk1gqGMU21Z4sRJ8hdeVw1U'
#    provider :facebook, '309309782430004', '0e74f3175a3995c79653dbe18c60d0d8'
#  end
end
