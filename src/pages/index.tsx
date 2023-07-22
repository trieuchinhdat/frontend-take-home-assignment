import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

// const tabItems: string[] = ['All', 'Pending', 'Completed']
interface ITodo {
  label: string
  statuses: ('completed' | 'pending')[]
}
const tabItems: ITodo[] = [
  { label: 'All', statuses: ['pending', 'completed'] },
  { label: 'Pending', statuses: ['pending'] },
  { label: 'Completed', statuses: ['completed'] },
]
const Index = () => {
  const [activeTab, setActiveTab] = useState<string>(String(tabItems[0]?.label))
  const [status, setStatus] = useState<('completed' | 'pending')[]>([
    'completed',
    'pending',
  ])

  const handleTabsChange = (value: string) => {
    const item: ITodo[] = tabItems.filter((item) => item.label === value)
    const status: ('completed' | 'pending')[] = item[0]?.statuses as (
      | 'completed'
      | 'pending'
    )[]
    setActiveTab(value)
    setStatus(status)
  }

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <div>
          <Tabs.Root
            className="pt-10"
            defaultValue={tabItems[0]?.label}
            onValueChange={handleTabsChange}
          >
            <Tabs.List className="flex gap-2">
              {tabItems.map((item, index) => (
                <Tabs.Trigger
                  key={index}
                  value={item.label}
                  aria-label={`${item.label} tab`}
                  className={`rounded-full border-[1px] border-gray-200 p-6 py-3 text-sm font-bold ${
                    activeTab === item.label &&
                    'border-0 bg-gray-700 text-white'
                  }`}
                >
                  {item.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>
        <div className="pt-10">
          <TodoList statuses={status} />
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
