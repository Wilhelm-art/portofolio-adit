import { MessageCircle } from 'lucide-react';
import { CONTACT_DATA } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const encodedMessage = encodeURIComponent(CONTACT_DATA.whatsappMessage);
  const whatsappUrl = `https://wa.me/${CONTACT_DATA.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label={t('whatsapp.chat')}
      >
        <MessageCircle size={28} />
        
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75" />
        
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-navy-800 animate-pulse" />
      </a>
      
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-slate-800 dark:bg-navy-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-transparent dark:border-white/10 hidden sm:block">
        {t('whatsapp.chat')}
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-slate-800 dark:bg-navy-900 rotate-45 border-r border-t border-transparent dark:border-white/10" />
      </div>
    </div>
  );
}
