export default function(profile) {
	 return {
	 	...buildJSON(profile),
	 	_raw: JSON.stringify(buildJSON(profile)),
	 	_json: buildJSON(profile)
	 }
}

function buildJSON(profile) {
	return {
		provider: 'hitbox',
		id: profile.user_id,
		username: profile.user_name,
		displayName: profile.user_name,
		email: profile.user_email,
	}
}