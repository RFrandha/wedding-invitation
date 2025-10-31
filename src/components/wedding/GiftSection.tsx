'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { theme, hexToRgba, getBgColor } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { DecorativeLine } from '@/components/ui/decorative-line';

export default function GiftSection() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const accounts = [
    {
      bank: 'BCA',
      accountNumber: '1234567890',
      accountName: 'Restow Frandha',
      logo: 'https://f005.backblazeb2.com/file/rv-prewed/pub-img/bca.jpeg',
    },
    {
      bank: 'BNI',
      accountNumber: '0987654321',
      accountName: 'Verina Mardhatillah',
      logo: 'https://f005.backblazeb2.com/file/rv-prewed/pub-img/bni.jpeg',
    },
  ];

  const copyToClipboard = async (accountNumber: string, bank: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(bank);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={getBgColor(theme.colors.primary[800])}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Top Decorative Element */}
          <DecorativeLine variant="with-dots" className="mb-6" />

          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-white mb-4">
            Wedding Gift
          </h2>
          <p className="text-white/80 font-light max-w-2xl mx-auto">
            Your presence is the greatest gift, but if you wish to bless us, you may do so through:
          </p>

          {/* Bottom Decorative Element */}
          <DecorativeLine variant="with-ornament" className="mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {accounts.map((account, index) => (
            <motion.div
              key={account.bank}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }
              }}
              className="group"
            >
              <Card className="p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden" style={{ ...getBgColor(theme.colors.primary[700], 0.3), backdropFilter: 'blur(12px)', borderColor: hexToRgba(theme.colors.secondary[500], 0.3) }}>
                {/* Subtle overlay */}
                <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[500], 0.05)}></div>
                
                {/* Border accent effect */}
                <div className="absolute inset-0 rounded-lg border-t-2 transition-colors duration-500" style={{ borderTopColor: 'transparent' }}></div>
                
                <div className="relative z-10">
                  {/* Bank Logo Placeholder */}
                  <motion.div 
                    className="w-24 h-24 mx-auto mb-8 rounded-lg flex items-center justify-center relative overflow-hidden"
                    style={{ ...getBgColor(theme.colors.primary[600], 0.5) }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 8
                      }
                    }}
                  >
                    <Image 
                      src={account.logo} 
                      alt={`${account.bank} logo`}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </motion.div>

                  <h3 className="text-3xl font-serif font-medium text-white mb-6 tracking-wide">
                    {account.bank}
                  </h3>
                  
                  {/* Decorative line under title */}
                  <div className="h-0.5 rounded-full mx-auto w-16 mb-8" style={getBgColor(theme.colors.secondary[400])} />
                  
                  <div className="space-y-6 text-white/90">
                    <div className="space-y-2">
                      <div className="text-sm font-light text-white/70">Account Number</div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                        className="text-2xl font-mono font-bold tracking-wider text-white cursor-pointer hover:text-white/80 transition-colors w-full relative group flex items-center justify-center gap-3"
                      >
                        {account.accountNumber}
                        <motion.div
                          initial={false}
                          animate={{ 
                            scale: copiedAccount === account.bank ? [1, 1.2, 1] : 1 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {copiedAccount === account.bank ? (
                            <Check className="w-5 h-5" style={{ color: theme.colors.secondary[400] }} />
                          ) : (
                            <Copy className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                          )}
                        </motion.div>
                        <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity" 
                          style={getBgColor(theme.colors.secondary[400], 0.1)}
                        />
                      </motion.button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-light text-white/70">Account Name</div>
                      <div className="font-light text-white">
                        {account.accountName}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 font-light italic">
            Thank you for your love and generosity
          </p>
        </motion.div>
      </div>
    </section>
  );
}
