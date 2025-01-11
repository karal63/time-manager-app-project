# ProductIVE

## ⚙ Do czego służy aplikacja?

Aplikacja Time Manager umożliwia efektywne zarządzanie czasem, ułatwiając planowanie codziennych zadań i organizację obowiązków. Dzięki intuicyjnemu interfejsowi, użytkownicy mogą łatwo tworzyć harmonogramy.

## ⛓ Jak działa?

Aplikacja Time Manager działa poprzez tworzenie list zadań oraz harmonogramów. Użytkownik wprowadza swoje zadania, ustala priorytety i terminy, a aplikacja monitoruje postęp, wysyłając powiadomienia o zbliżających się terminach oraz pomagając utrzymać porządek w codziennych obowiązkach.

## ♦ Na czym polega interakcja z użytkownikiem?

Interakcja z użytkownikiem w aplikacji Time Manager polega na intuicyjnym dodawaniu, edytowaniu i usuwaniu zadań oraz planowaniu czasu za pomocą prostego interfejsu. Aplikacja dostosowuje się do preferencji użytkownika, wysyłając przypomnienia o nadchodzących zadaniach i proponując optymalne rozwiązania dla lepszego zarządzania czasem.

## ⚒ Wersyfikacja

### **[ver. 0.00 Beta] - 2024-09-19**

-   stworzenie podstawy aplikacji

### **[ver. 0.10 Beta] - 2024-10-13**

-   stworzenie wygodnej interakcji z navigacją boczną (zamykanie, otwieranie).
-   stworzenie nawigacji pomiędzy aplikacjami

### **[ver. 0.11 Beta] - 2024-10-13**

-   użycie metody clean code: KISS

### **[ver. 0.12 Beta] - 2024-10-13**

-   użycie metody clean code: YAGNI

### **[ver. 0.13 Beta] - 2024-10-13**

-   użycie metody clean code: DRY

### **[ver. 0.14 Beta] - 2024-10-13**

-   użycie metody clean code: Fail Fast

### **[ver. 0.15 Beta] - 2024-10-13**

-   użycie metody clean code: Use Meaningful Names

### **[ver. 0.16 Beta] - 2024-10-26**

-   Usunięcie poprzedniego bocznego bloku nawigacyjnego i utworzenie nowego.

### **[ver. 0.17 Beta] - 2024-10-26**

-   utworzenie podstrony /planner/observe
-   utworzenie przełącznika trybu u podstron /planner i /planner/observe
-   utworzenie podstrony, która ma się wyświetlać w przypadku gdy został źle podany url np. planner1

### **[ver. 0.20 Beta] - 2024-12-01**

-   stworzenie store.js;
-   stworzenie komponentu AddTimeRangePanel, czyli panelu który odpowiada za interakcję z użytkownikiem pod względem utworzenia nowego zakresu czasu;
-   stworzenie wyprowadającego okienka, który ma się pojawiać kiedy użytkownik utworzył nowy zakres czasu, w przyszłości będzie rozwijane;
-   stworzenie strony Planner, na której narazie można zobaczyćstrukturę dnia

### **[ver. 0.30 Beta] - 2025-01-04**

-   Stworzenie strefy skrolowania w podstronie "planner"
-   Stworzenie pojedynczych kresek "SingleTimeMark" na linii dnia
-   Stworzenie pojedynczego bloku okresu czasu "SingleBlock"
-   Stworzenie funkcji "setRnagePosition" w "store.js"
-   Stworzenie funkcji "addTimeRange" w "store", która dodaje nowy okres czasu
-   Stworzenie funkcji "setNewZoomLevel" w "store", która ustawia poziom przybliżenia
-   Dodanie zasady, która wyłącza sprawdzenie poprawności parametrów przekazywanych do nowego komponentu w pliku"eslint.config.js"

### **[ver. 0.31 Beta] - 2025-01-04**

-   Usunięcie nieużywanych rzeczy

### **[ver. 0.32 Beta] - 2025-01-07**

-   Stworzenie otwierającego się okienka przy naciśnięciu na blok (okres czasu)
-   Aktualizacja okna informacyjnego (od tej wersji jest dynamiczne)
-   Stworzenie funkcji odpowiedzialnych za manipulację nad listą istniejących bloków (okresach czasu) (dodawanie, usuwanie oraz modyfikowanie)
-   Stworzenie animacji dla każdego bloku przy występowaniu określonego zdarzenia

### **[ver. 0.33 Beta] - 2025-01-08**

-   Dodano funkcjonalność umożliwiającą zapis listy okresów czasu na lokalnym urządzeniu użytkownika za pomocą mechanizmu localStorage.

### **[ver. 0.34 Beta] - 2025-01-11**

-   Umożliwienie użytkownikowi ustawiania godzin z dokładnością do minut.

### **[ver. 0.35 Beta] - 2025-01-11**

-   Umożliwienie cofnięcia usunięcia wybranego okresu czasu.
