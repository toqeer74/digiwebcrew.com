'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
    <div className="space-y-3.5">
      {items.map((item) => {
        const isOpen = openItems.includes(item.value)
        return (
          <div
            key={item.value}
            className="group rounded-2xl border border-slate-200 bg-white/70 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-white/8 dark:bg-midnight/40 dark:hover:border-white/20 dark:hover:bg-midnight/60"
          >
            <button
              onClick={() => toggleItem(item.value)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors cursor-pointer"
            >
              <h3 className="font-heading font-bold text-slate-950 dark:text-white text-base md:text-[17px] tracking-tight leading-snug">
                {item.title}
              </h3>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 group-hover:bg-[var(--site-primary)]/10 dark:group-hover:bg-white/10 transition-colors">
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChevronDown size={15} className="text-slate-500 dark:text-slate-400 group-hover:text-[var(--site-primary)] dark:group-hover:text-white transition-colors" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-slate-100 dark:border-white/5 mx-6" />
                  <div className="px-6 py-5">
                    <p className="font-body text-slate-600 dark:text-slate-350 leading-relaxed text-sm md:text-[15px]">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export const AccordionItem = ({}: {
  value: string
  children: React.ReactNode
}) => {
  return null
}

