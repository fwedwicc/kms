import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FAQs, Contents, GeneralInfo } from './index'
import { HiOutlinePlusSm } from "react-icons/hi"
import { Button } from '../ui'

const tabs = ["General", "Contents", "FAQs"]

function ContentManagement() {
  const [activeTab, setActiveTab] = useState("General")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading / Subheading */}
      <div className="flex items-end justify-between">
        <div>
          <h3>Content Management</h3>
          <p>Manage your General, Contents, and Contact information here.</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b border-neutral-200/80 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer pb-2 transition relative ${activeTab === tab ? "font-semibold text-neutral-900" : "text-neutral-600"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-0.5 h-[3px] bg-neutral-900 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {/* Contents */}
          {activeTab === "Contents" && (
            <Contents />
          )}
          {/* FAQs */}
          {activeTab === "FAQs" && (
            <FAQs />
          )}
          {/* General */}
          {activeTab === "General" && (
            <GeneralInfo />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ContentManagement
