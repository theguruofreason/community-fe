export function Error({ text }: { text: string | undefined }) {
    const message = text;
    return message ? (
        <div>
            <h5 style={{ margin: 0, color: 'red' }}>{message}</h5>
        </div>
    ) : null;
}
