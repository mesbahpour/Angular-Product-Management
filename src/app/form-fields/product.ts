export const Product = {
    mfgDate: {
      label: 'تاریخ تولید',
      value: '1399-1-1',
      type: 'text',
      validation: {
        required: true,
      },
    },
    title: {
      label: 'عنوان',
      value: '',
      type: 'text',
      validation: {
        required: true,
      },
    },
    staus: {
      label: 'وضعیت',
      value: 'active',
      type: 'radio',
      options: [
        { value: 'active', label: 'فعال' },
        { value: 'deActive', label: 'غیرفعال' },
      ],
    },
  };
  