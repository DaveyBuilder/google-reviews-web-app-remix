import { Form, useActionData, useNavigation } from "@remix-run/react";

export async function action({ request }) {
    const formData = await request.formData();
    // Process formData...
    const customerName = formData.get("customerName");
    const customerEmail = formData.get("customerEmail");
    // Add validation or processing logic here
    

    return { success: "Thank you for your submission!" };
}

export default function ReviewSignup() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <Form method="post" className="space-y-6">
                <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input type="text" name="customerName" id="customerName" className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:bg-white focus:ring-1 focus:ring-indigo-500 sm:text-sm" style={{height: '2.5rem'}} required />
                </div>
                <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Customer Email</label>
                    <input type="email" name="customerEmail" id="customerEmail" className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:bg-white focus:ring-1 focus:ring-indigo-500 sm:text-sm" style={{height: '2.5rem'}} required />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{height: '2.5rem'}}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </Form>
            {actionData?.success && <p className="mt-3 text-center text-sm text-green-600">{actionData.success}</p>}
            {/* Optionally handle and display errors from actionData */}
        </div>
    );
}