import { useEffect } from 'react';
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { supabase } from "../../utils/supabaseClient";
import confetti from 'canvas-confetti';
import { correctCommonEmailTypos } from "../../utils/emailUtils";

export async function action({ request }) {
    console.log("Starting action function");
    const formData = await request.formData();
    const errors = {};

    // Validate customer name
    const customerName = formData.get("customerName").trim();
    if (!customerName) {
      console.log("Action validation failed - Customer name is required.");
      errors.customerName = "Customer name is required.";
    } else if (customerName.includes(" ")) { // Check if the name contains spaces
      console.log("Action validation failed - Please enter only the first name.");
      errors.customerName = "Please enter only the first name.";
    }

    // Validate customer email with typo correction
    const customerEmail = formData.get("customerEmail").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
        console.log("Action validation failed - Customer email is invalid.");
        errors.customerEmail = "Please enter a valid email address.";
    } else {
        // Check for common typos and suggest corrections
        // correctCommonEmailTypos function is in utils/emailUtils.js
        const correctedEmail = correctCommonEmailTypos(customerEmail);
        if (correctedEmail !== customerEmail) {
            console.log(`Action validation failed - Did you mean ${correctedEmail}?`);
            errors.customerEmail = `Did you mean ${correctedEmail}?`;
        }
    }

    // Validate staff name
    const staffName = formData.get("staffName");
    if (staffName === "") {
      console.log("Action validation failed - Staff name is required.");
      errors.staffName = "Staff name is required.";
  }

    // If there are any errors, return them to the form
    if (Object.keys(errors).length > 0) {
        console.log("Returning errors to the form.");
        return { errors };
    }

    try {
      const { data, error } = await supabase
        .from(process.env.TABLE_NAME)
        .insert([
          { customer_first_name: customerName, customer_email: customerEmail, staff_member: staffName}
        ]);

      if (error) {
        console.error("Supabase error:", error.message);
        if (error.message.includes("duplicate key value violates unique constraint")) {
          return { error: "This email address has already been added" };
        } else {
        return { error: "Failed to add customer to the database" };
        }
      } else {
        console.log("Customer successfully added to mailing list", data);
        return { success: "Customer successfully added to mailing list", timestamp: Date.now() };
      }
    } catch (error) {
      console.error("Caught an error in the action function:", error);
      return { error: "An unexpected error occurred" };
    }
}

export default function ReviewSignup() {
  console.log("Rendering ReviewSignup Component")
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Trigger confetti when there is a success message
  useEffect(() => {
    if (actionData?.success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [actionData?.success, actionData?.timestamp]); // Add actionData?.timestamp as a dependency

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-2">
      <div className="text-center mb-4 w-full">
        <Link to="leaderboard" className="text-orange-500 hover:text-orange-700 font-medium text-lg py-2 px-4 rounded-lg border border-orange-500 hover:border-orange-700 transition-colors duration-200 ease-in-out">
          🏆 View Leaderboard 🏆
        </Link>
      </div>
      <div className="w-full max-w-lg p-8 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow border border-gray-200 mx-auto flex flex-col">
        <Form method="post" className="space-y-8">
          <div>
            <label htmlFor="customerName" className="block text-base font-medium text-gray-700">Customer First Name</label>
            <input type="text" name="customerName" id="customerName" className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:bg-white focus:ring-1 focus:ring-indigo-500 text-lg" style={{height: '3.125rem'}} required />
            {actionData?.errors?.customerName && (
              <p className="text-red-600 mt-2 text-base">{actionData.errors.customerName}</p>
            )}
          </div>
          <div>
            <label htmlFor="customerEmail" className="block text-base font-medium text-gray-700">Customer Email</label>
            <input type="email" name="customerEmail" id="customerEmail" className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:bg-white focus:ring-1 focus:ring-indigo-500 text-lg" style={{height: '3.125rem'}} required />
            {actionData?.errors?.customerEmail && (
              <p className="text-red-600 mt-2 text-base">{actionData.errors.customerEmail}</p>
            )}
          </div>
          <div>
            <label htmlFor="staffName" className="block text-base font-medium text-gray-700">Staff Name</label>
            <select name="staffName" id="staffName" className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:bg-white focus:ring-1 focus:ring-indigo-500 text-lg" required>
              <option value="">-Select-</option>
              <option value="Ashley">Ashley</option>
              <option value="Dean">Dean</option>
              <option value="Gina">Gina</option>
              <option value="Krissie">Krissie</option>
              <option value="Margaret">Margaret</option>
              <option value="Miles">Miles</option>
              <option value="Sandra">Sandra</option>
              <option value="Steve">Steve</option>
              <option value="Sue">Sue</option>
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" style={{height: '3.125rem'}}>
            {isSubmitting ? "Submitting..." : "Request Google Review"}
          </button>
        </Form>
        {actionData?.success && <p className="mt-3 text-center text-base text-green-600">{actionData.success}</p>}
        {actionData?.error && <p className="text-red-600 mt-3 text-center text-base">{actionData.error}</p>}
      </div>
      <div className="mt-4 w-full max-w-lg mx-auto">
        <img src="/branding_banner.jpg" alt="Banner" className="w-full h-auto" />
      </div>
    </div>
  );
}