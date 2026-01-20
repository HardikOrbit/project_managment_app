export function applyLaravelErrors(errors, form) {
    if (!errors || Object.keys(errors).length === 0) return;

    form.clearErrors();

    for (const [field, messages] of Object.entries(errors)) {
        form.setError(field, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
        });
    }
}
