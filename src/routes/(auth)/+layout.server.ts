import { redirect } from "@sveltejs/kit";

export async function load ({cookies}) {   
    if (!cookies.get('id')) {
        throw redirect(303,"/");
    }
}