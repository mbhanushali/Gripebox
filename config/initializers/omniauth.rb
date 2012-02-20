Rails.application.config.middleware.use OmniAuth::Builder do
#  if Rails.env == 'production'
    provider :twitter, 'ynZ9AyufbSUNct5sag74iw', '1qucTtFnxKGaeAFaOtAGx64KWLe3Dqa5nEVwGItnb0'
    provider :facebook, '259665494110245', '8c55ada2517263f7d88f0f53a4aa6744'
#  else
#    provider :twitter, 'aYSqTba7BZ340ZiC6nXULA', '7FzoCFhIAwvVBPvb1Pk1gqGMU21Z4sRJ8hdeVw1U'
#    provider :facebook, '309309782430004', '0e74f3175a3995c79653dbe18c60d0d8'
#  end
end
