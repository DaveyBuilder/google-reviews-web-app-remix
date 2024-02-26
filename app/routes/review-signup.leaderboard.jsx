import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { supabase } from "../../utils/supabaseClient";

export const loader = async () => {
  try {
    const { data: allTimeData, error: allTimeError } = await supabase.rpc('get_staff_member_counts_alltime');
    if (allTimeError) throw allTimeError;

    const { data: monthlyData, error: monthlyError } = await supabase.rpc('get_staff_member_counts_monthly');
    if (monthlyError) throw monthlyError;

    // Sort both datasets by count in descending order
    const sortedAllTimeData = allTimeData.sort((a, b) => b.count - a.count);
    const sortedMonthlyData = monthlyData.sort((a, b) => b.count - a.count);

    return json({ allTime: sortedAllTimeData, monthly: sortedMonthlyData });
  } catch (error) {
    console.error("Error loading leaderboard data:", error.message);
    throw new Error("Loading leaderboard data failed.");
  }
};

export default function Leaderboard() {
  const leaderboardData = useLoaderData();
  return (
    <section className="max-w-4xl mx-auto p-4 animate-fadeIn">
      <div className="text-center mb-4">
        <Link to="/review-signup" className="text-orange-500 hover:text-orange-700 font-medium text-lg py-2 px-4 rounded-lg border border-orange-500 hover:border-orange-700 transition-colors duration-200 ease-in-out">
          ← Back to Signup
        </Link>
      </div>
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">🏆 Leaderboard 🏆</h2>
      
      {/* Monthly Leaderboard */}
      {leaderboardData.monthly.length > 0 ? (
        <div className="overflow-hidden rounded-lg shadow-xl mb-10">
          <div className="flex justify-between px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold">
            <span>This Month</span>
            <span>Number of Reviews Requested</span>
          </div>
          <ul className="divide-y divide-gray-200">
          {leaderboardData.monthly.map((entry, index) => (
            <li key={index} className={`p-4 flex justify-between items-center transition duration-300 ease-in-out ${index === 0 ? 'bg-yellow-400 bg-opacity-30' : index === 1 ? 'bg-gray-400 bg-opacity-30' : index === 2 ? 'bg-orange-400 bg-opacity-30' : 'bg-transparent'} text-gray-800`}>
              <span className="font-semibold text-lg">{entry.staff_member}</span>
              <span className={`inline-flex items-center justify-center px-4 py-2 text-sm font-bold leading-none rounded-full shadow-md text-lg text-gray-800 bg-gray-50`}>
                {entry.count} {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index === 3 ? '🎗' : index === 4 ? '🌟' : index === 5 ? '✨' : ''}
              </span>
            </li>
          ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-10">No monthly leaderboard data available.</p>
      )}

      {/* All Time Leaderboard */}
      {leaderboardData.allTime.length > 0 ? (
        <div className="overflow-hidden rounded-lg shadow-xl">
          <div className="flex justify-between px-4 py-2 bg-gradient-to-r from-green-500 to-blue-800 text-white font-bold">
            <span>All Time</span>
            <span>Number of Reviews Requested</span>
          </div>
          <ul className="divide-y divide-gray-200">
          {leaderboardData.allTime.map((entry, index) => (
            <li key={index} className={`p-4 flex justify-between items-center transition duration-300 ease-in-out ${index === 0 ? 'bg-yellow-400 bg-opacity-30' : index === 1 ? 'bg-gray-400 bg-opacity-30' : index === 2 ? 'bg-orange-400 bg-opacity-30' : 'bg-transparent'} text-gray-800`}>
              <span className="font-semibold text-lg">{entry.staff_member}</span>
              <span className={`inline-flex items-center justify-center px-4 py-2 text-sm font-bold leading-none rounded-full shadow-md text-lg text-gray-800 bg-gray-50`}>
                {entry.count} {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index === 3 ? '🎗' : index === 4 ? '🌟' : index === 5 ? '✨' : ''}
              </span>
            </li>
          ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">No all-time leaderboard data available.</p>
      )}
    </section>
  );
}