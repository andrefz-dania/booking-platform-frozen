'use client';
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('searchTerm', term);
          } else {
            params.delete('searchTerm');
          }
          replace(`${pathname}?${params.toString()}`);
      }
    
    const debouncedSearch = useDebouncedCallback((term) => {
        handleSearch(term);
    }, 300)

    return (
        <InputGroup className="lg:text-xl md:text-xl sm:text-xl text-xl  my-8 py-8 flex flex-row-reverse px-4 gap-2 place-content-between">
                <InputGroupInput
                    type="search"
                    id="search"
                    placeholder="Søg efter turneringer, kurser, og mere..."
                    className="lg:text-xl md:text-xl sm:text-xl text-xl "
                    onChange={(e) => debouncedSearch(e.target.value)}
                    defaultValue={searchParams.get('searchTerm')?.toString()}
                />
                <InputGroupAddon>
                    <button
                        type="submit"
                        className="p-4 rounded-md hover:bg-accent/50 hover:cursor-pointer"
                    >
                        <SearchIcon
                            size={18}
                            strokeWidth={3}
                            className="h-full"
                        />
                    </button>
                </InputGroupAddon>
            </InputGroup>
    )
}