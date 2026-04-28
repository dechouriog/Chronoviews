export type Article = {
  id: string
  title: string
  author: string
  date: string
  summary: string
  content: string
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Why Tracking Your Time Changes Everything',
    author: 'Diego Chourio',
    date: '2025-01-10',
    summary: 'Most people have no idea where their hours actually go. Time tracking turns vague feelings into concrete data you can act on.',
    content: `Time is the one resource you cannot recover. Yet most people spend it without ever measuring it. When you start logging your hours — even for just one week — patterns emerge that are impossible to ignore. You discover that the task you thought took 30 minutes actually takes two hours. You realize that "quick meetings" consume a third of your day. Time tracking is not about control or surveillance. It is about awareness. Once you see the data, you can make intentional decisions about where your energy goes. The first step is simply to start logging. No system needs to be perfect from day one.`,
  },
  {
    id: '2',
    title: 'How to Set Meaningful Time Goals',
    author: 'Leidy Obando',
    date: '2025-02-14',
    summary: 'Setting a goal of "40 hours on deep work this month" is more powerful than a vague intention to "be more productive".',
    content: `A goal without a number attached to it is just a wish. When it comes to time management, specificity is everything. Instead of saying you want to read more, commit to two hours of reading per week. Instead of wanting to exercise, log four hours of fitness per month. The key insight is that time goals are measurable in a way that outcome goals often are not. You cannot always control whether a project succeeds, but you can control how many hours you invest in it. CronoView lets you set monthly targets per task and watch your progress fill up in real time. The psychology of a progress bar moving toward a goal is surprisingly motivating.`,
  },
  {
    id: '3',
    title: 'The Categories That Reveal Your Real Priorities',
    author: 'Diego Chourio',
    date: '2025-03-05',
    summary: 'When you group tasks by category — Work, Fitness, Family — you get a brutally honest picture of what you actually prioritize versus what you say you prioritize.',
    content: `We all have an idealized version of how we spend our time, and then we have reality. Most people believe they dedicate significant time to health, relationships, and personal growth. The data usually tells a different story. By grouping your tasks into categories like Work, Study, Fitness, Family, and Spirituality, you create a distribution chart of your actual priorities. This is not about judgment. It is about alignment. If your data shows 80% Work and 2% Family, and that does not match your stated values, you now have the information you need to make a change. The donut chart in your statistics view is not just pretty — it is a mirror.`,
  },
]