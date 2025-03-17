const { VITE_COMMUNITY_NAME } = import.meta.env;

export default function LandingPage() {
    return (
        <div id="landing">
            <h1>Welcome to the landing page for {VITE_COMMUNITY_NAME}!</h1>
        </div>
    );
}
