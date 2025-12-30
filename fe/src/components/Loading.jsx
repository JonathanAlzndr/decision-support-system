export default function Loading() {
	return (
		<div className="fixed inset-0 bg-white/50 backdrop-brightness-50 z-50 flex justify-center items-center">
			<div className="border-gray-300 h-18 w-18 animate-spin rounded-full border-8 border-t-sky-600" />
		</div>
	);
}
