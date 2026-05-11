import { useId, useState } from 'react';
import { useAuth } from './Auth';

export default function Homepage() {
    const { userInfo } = useAuth();
    return (
        <div className="Homepage">
            <h1>Welcome to the homepage, {userInfo?.uname}!</h1>
            <TextPost />
        </div>
    );
}

export function TextPost() {
    const [postText, setPostText] = useState('');
    const postTextAreaId = useId();
    return (
        <div className="new-text-post">
            <label htmlFor={postTextAreaId}>
                New Text Post:
                <br />
                <textarea
                    id={postTextAreaId}
                    className="post-text-entry"
                    value={postText}
                    onChange={(event) => setPostText(event.target.value)}
                    rows={10}
                    cols={80}
                />
            </label>
        </div>
    );
}
