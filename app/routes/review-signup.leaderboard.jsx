import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { supabase } from "../../utils/supabaseClient";

export const loader = async () => {
  try {
    const { data, error } = await supabase.rpc('get_staff_member_counts');
    if (error) throw error;
    // Sort the data by count in descending order
    const sortedData = data.sort((a, b) => b.count - a.count);
    return json(sortedData);
  } catch (error) {
    console.error("Error loading leaderboard data:", error.message);
    throw new Error("Loading leaderboard data failed.");
  }
};

export default function Leaderboard() {
  const leaderboardData = useLoaderData();
  return (
    <section className="max-w-4xl mx-auto p-4 animate-fadeIn">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">🏆 Leaderboard 🏆</h2>
      {leaderboardData.length > 0 ? (
        <div className="overflow-hidden rounded-lg shadow-xl">
          <ul className="divide-y divide-gray-200">
            {leaderboardData.map((entry, index) => (
              <li key={index} className={`p-4 flex justify-between items-center hover:bg-gray-50 transition duration-300 ease-in-out ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800' : index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' : index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <span className="font-semibold text-lg">{entry.staff_member}</span>
                <span className={`inline-flex items-center justify-center px-4 py-2 text-sm font-bold leading-none rounded-full shadow-md ${index === 0 ? 'text-yellow-900 bg-yellow-200' : index === 1 ? 'text-gray-800 bg-gray-200' : index === 2 ? 'text-orange-900 bg-orange-200' : index >= 3 && index <= 5 ? 'text-gray-800 bg-gray-50' : 'text-gray-800 bg-gray-50'}`}>
                  {entry.count} {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index >= 3 && index <= 5 ? '✨' : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">No leaderboard data available.</p>
      )}
    </section>
  );
}