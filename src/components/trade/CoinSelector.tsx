
import * as React from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

interface CoinSelectorProps {
  coins: Coin[];
  selectedCoin: string;
  onSelect: (value: string) => void;
}

export function CoinSelector({ coins, selectedCoin, onSelect }: CoinSelectorProps) {
  const [open, setOpen] = React.useState(false);
  
  const selected = coins.find(coin => coin.id === selectedCoin);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected ? `${selected.name} (${selected.symbol})` : "Select coin..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search coin..." />
          <CommandEmpty>No coin found.</CommandEmpty>
          <CommandGroup>
            {coins.map((coin) => (
              <CommandItem
                key={coin.id}
                value={coin.id}
                onSelect={(value) => {
                  onSelect(value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCoin === coin.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {coin.name} ({coin.symbol})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CoinSelector;
