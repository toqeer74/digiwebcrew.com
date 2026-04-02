'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
})

interface AccordionItem {
  value: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
}

export function Accordion({ items, type = 'single' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems(openItems[0] === value ? [] : [value])
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((v) => v !== value)
          : [...openItems, value],
      )
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.value}
          className="site-card site-card-interactive"
        >
          <button
            onClick={() => toggleItem(item.value)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-[rgba(var(--site-primary-rgb),0.08)]"
          >
            <h3 className={`${poppins.className} site-card-title font-medium`}>
              {item.title}
            </h3>
            <motion.div
              animate={{ rotate: openItems.includes(item.value) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-[var(--site-primary)]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openItems.includes(item.value) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="site-card-divider border-t px-6 py-4"
              >
                <p className="site-card-muted font-body leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export const AccordionItem = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  return null // This component is not used with the Accordion above, just for type compatibility
}

