import ProfileInfo from "@/components/profileInfo";

export default function ProfilePage() {
    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <div className="flex flex-col gap-4 w-full h-full">
                <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                    Profile
                </h1>
                <ProfileInfo />
            </div>
        </section>
    );
}
