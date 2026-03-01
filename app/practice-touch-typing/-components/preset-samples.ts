export interface PresetSample {
    title: string;
    content: string;
}

/**
 * Preset text samples users can click to start practicing instantly.
 * Replace the titles and content with your own examples.
 */
export const PRESET_SAMPLES: PresetSample[] = [
    {
        title: "Linus Torvalds",
        content: `In 1969, in Helsinki, Finland, a boy named Linus Benedict Torvalds was born into a family of journalists. His grandfather owned one of the first computers in Finland, a Commodore VIC-20, and young Linus was immediately hooked. While other kids played outside, he sat in a small room typing commands into that machine, fascinated by the idea that he could tell a computer what to do and it would obey.
Linus was not a loud kid. He was not the type to raise his hand in class or lead a group project. He was shy, introverted, and mostly kept to himself. But he had something that most people underestimate: a deep and relentless curiosity. He did not just want to use computers. He wanted to understand them from the ground up, every layer, every instruction, every byte.
When he enrolled at the University of Helsinki to study computer science, he discovered Unix, an operating system that was elegant and powerful but expensive and locked behind corporate licenses. Linus wanted something like Unix but free, something he could run on his own cheap PC at home. So at the age of twenty one, in a small apartment in Helsinki, he decided to build his own operating system kernel. Not because anyone asked him to. Not because he had a business plan. Simply because he wanted to learn how it worked.
He posted a humble message on a Usenet group in August 1991. He wrote that he was working on a free operating system, just a hobby, nothing big and professional. He said it would probably never support anything other than his own hardware. That little hobby project became Linux.
What happened next is one of the most remarkable stories in the history of technology. Developers from all over the world started contributing code. They fixed bugs, added features, and ported the kernel to new hardware. Linus did not build Linux alone. He built the seed, and then he built a community. He created a culture of open collaboration where anyone with skill and motivation could contribute, regardless of their degree, their country, or their employer.
Today, Linux runs on more devices than any other operating system in history. It powers almost every Android phone on the planet. It runs the servers behind Google, Amazon, Facebook, and Netflix. It operates the International Space Station. It drives most of the world's supercomputers. The tiny hobby project of a shy Finnish student became the backbone of the modern internet.
But Linus did not stop there. In 2005, he faced another problem. The version control system used by Linux kernel developers was no longer available to them for free. Instead of complaining, Linus spent about ten days building his own tool. He called it Git. That tool is now the most widely used version control system in the world, and it gave rise to platforms like GitHub, which transformed how millions of developers collaborate on code.
There are many lessons in the story of Linus Torvalds, but here are the ones that matter most.
First, you do not need permission to start. Linus did not wait for a company to hire him. He did not wait for a professor to assign the project. He just started building because he was curious. The best projects often begin not with a grand vision but with a simple question: how does this work, and can I build it myself?
Second, small beginnings are not small endings. Linus described Linux as just a hobby. He genuinely did not expect it to become anything significant. But he kept working on it, kept improving it, and kept sharing it. Consistency and openness turned a hobby into a revolution. Never underestimate what you are building today just because it looks small right now.
Third, community multiplies effort. Linus understood early that he could not build everything alone. By making Linux open source, he invited the world to help. The result was something no single company could have built. If you are working on a project, think about how you can involve others. Share your work. Accept contributions. Build in the open.
Fourth, solving your own problems is a valid strategy. Both Linux and Git were born because Linus had a personal itch to scratch. He needed an operating system he could afford. He needed a version control tool that worked the way he wanted. The best tools often come from people who are frustrated enough to build their own solution. If something annoys you in your daily workflow, that frustration might be pointing you toward your next great project.
Fifth, introversion is not a weakness. Linus is famously introverted. He works from home. He communicates mostly through email and mailing lists. He does not give flashy keynote speeches or chase social media fame. Yet he has influenced the world more than most extroverted tech leaders. Your personality is not a limitation. It is a different kind of strength. The world needs people who think deeply, work quietly, and let their output speak for itself.
Sixth, perfection is the enemy of progress. The first version of Linux was rough. It barely worked. It supported almost no hardware. But Linus released it anyway. He knew that getting feedback from real users was more valuable than polishing code in isolation. If you are waiting until your project is perfect before you show it to anyone, you are waiting too long. Ship early. Iterate often. Let the world help you improve.
Seventh, learning never stops. Even after creating one of the most important pieces of software in history, Linus continues to review code, make decisions about the kernel, and learn from contributors around the world. Mastery is not a destination. It is a practice. Every line of code you write, every bug you fix, every new technology you explore adds to your skill and your understanding.
Think about where you are right now. You are sitting at your keyboard, practicing your typing, building a skill that will serve you every single day of your career. Every word you type is training your fingers and your brain to work together faster and more accurately. It might feel tedious sometimes. It might feel like progress is slow. But remember Linus in his small apartment in Helsinki, typing away at something nobody else believed in. He did not know where it would lead. He just kept going.
You are building something too. Maybe it is a SaaS platform. Maybe it is a mobile app. Maybe it is your career, your skills, your future. Whatever it is, the recipe is the same. Start where you are. Use what you have. Do not wait for perfect conditions. Share your work. Learn from feedback. And never, ever stop typing.
The world does not reward the most talented. It rewards the most persistent. Keep your fingers on the home row. Keep your eyes on the screen. And keep building, one keystroke at a time.
`,
    },
    {
        title: "Nature and Science",
        content: `The ocean covers more than seventy percent of the Earth's surface. It plays a crucial role in regulating the planet's climate by absorbing heat from the sun and distributing it around the globe through ocean currents.

Photosynthesis is the process by which plants convert sunlight into energy. This remarkable chemical reaction takes carbon dioxide from the air and water from the soil to produce glucose and oxygen.

The human brain contains approximately eighty-six billion neurons. Each neuron can form thousands of connections with other neurons, creating an incredibly complex network that enables thought, memory, and consciousness.`,
    },
    {
        title: "History of the Internet",
        content: `The Internet began as a military project called ARPANET in the late nineteen sixties. It was designed to create a communication network that could survive a nuclear attack by routing data through multiple paths.

Tim Berners-Lee invented the World Wide Web in nineteen eighty-nine while working at CERN. He created HTML, HTTP, and the first web browser, making the Internet accessible to ordinary people around the world.

Today, over five billion people use the Internet daily. From social media to online banking, from streaming services to cloud computing, the Internet has transformed nearly every aspect of modern life.`,
    },
    {
        title: "Short Warm-up",
        content: `The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly at dawn. Sphinx of black quartz, judge my vow.`,
    },
];
