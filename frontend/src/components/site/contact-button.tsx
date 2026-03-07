import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Mail} from "lucide-react";
import type {Locale} from "@/i18n/config";
import type {Messages} from "@/i18n/messages";

type ContactButtonProps = {
    locale: Locale;
    messages: Messages;
};

export default function ContactButton({ locale, messages }: ContactButtonProps) {
    return (
        <Button asChild size="lg" className="text-white!">
            <Link href={`/${locale}/contact`}>
                {messages.nav.contact}
                <Mail className="size-4" />
            </Link>
        </Button>
    )
}
