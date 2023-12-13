import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <button>asd</button>
      <button>asd</button>
      <div>{t('test')}</div>
    </div>
  );
};
