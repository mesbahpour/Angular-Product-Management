export const Company = {
    name: {
      label: 'نام',
      value: '',
      type: 'text',
      validation: {
        required: true,
      },
    },
    phone: {
      label: 'تلفن',
      value: '',
      type: 'text',
      validation: {
        required: true,
      },
    },
    type: {
      label: 'نوع',
      value: 'محصولات غذایی',
      type: 'select',
      options: [
        { value: 'محصولات غذایی', label: 'محصولات غذایی' },
        { value: 'لوازم الکترونیکی', label: 'لوازم الکترونیکی' },
        { value: 'لوازم خانگی', label: 'لوازم خانگی' },
      ],
    },
  };
  