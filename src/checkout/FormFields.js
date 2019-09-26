const fields = [
    {
      type: 'text',
      name: 'user_name',
      required: true,
      icon: 'ios-person',
      label: 'Username',
    },
    {
      type: 'password',
      name: 'password',
      icon: 'ios-lock',
      required: true,
      label: 'Password',
    },
    {
      type: 'picker',
      name: 'country',
      mode: 'dialog',
      label: 'Select Country',
      defaultValue: 'INDIA',
      options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
    },
  ];