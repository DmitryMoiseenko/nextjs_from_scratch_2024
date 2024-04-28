import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
export const dymamic = "force-dynamic";

// GET /api/bookmarks/check:propertyId
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const propertyId = params.propertyId;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response("UserID is required", { status: 401 });
        }

        const { userId } = sessionUser;

        // Find user in database
        const user = await User.findOne({ _id: userId });

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
};