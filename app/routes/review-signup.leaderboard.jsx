import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { supabase } from "../../utils/supabaseClient";

export const loader = async () => {
  const { data, error } = await supabase
    .from('signed-up-customers')
    .select('*');

  if (error) throw new Error("Loading leaderboard data failed.");

  return json(data);
};

export default function Leaderboard() {
  const leaderboardData = useLoaderData();
  return (
    <section>
      <h2>Leaderboard</h2>
      {leaderboardData.length > 0 ? (
        <ul>
          {leaderboardData.map((entry, index) => (
            <li key={index}>
              <span>{entry.customer_first_name}</span> - <span>{entry.customer_email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </section>
  );
}