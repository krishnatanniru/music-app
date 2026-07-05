import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | EchoVerse AI',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-text-secondary">Here's a quick overview of your music studio.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Songs', value: '12' },
          { title: 'Voice Profiles', value: '3' },
          { title: 'Total Plays', value: '1,248' },
          { title: 'Credits Remaining', value: '45' }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-xl flex flex-col gap-2">
            <h3 className="text-text-secondary text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Recent Songs</h2>
      </div>
      
      <div className="glass rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center">
          <span className="text-2xl">🎵</span>
        </div>
        <h3 className="text-lg font-medium">No songs yet</h3>
        <p className="text-text-secondary max-w-md">You haven't generated any songs yet. Head over to the Create tab to generate your first AI masterpiece.</p>
      </div>
    </div>
  );
}