import { ShieldCheck } from 'lucide-react';

export default function PrivacyNotice() {
  return <div className="flex gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-500"><ShieldCheck className="w-5 h-5 shrink-0 text-neutral-700" /><p>Your camera is used only for colour analysis. Do not upload sensitive images. Images should not be stored unless you explicitly choose to save them.</p></div>;
}
