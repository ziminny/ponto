export class Month
{
  
  public static getMonth() :string
  {
    return Month.months(new Date)
  }

  public static getMonthNumber() :number
  {
    return new Date().getMonth() + 1;
  }

   private static months(date:Date) :string
   {
      const months = [
          'janeiro',
          'fevereiro',
          'março',
          'abril',
          'maio',
          'junho',
          'julho',
          'agosto',
          'setembro',
          'outubro',
          'novembro',
          'dezembro'
      ]

      return months[date.getMonth()]
   }

   public static daysWeek(date:Date) :string 
   {
      const days = [
        'domingo',
        'segunda feira',
        'terça feira',
        'quarta feira',
        'quinta feira',
        'sexta feira',
        'sábado' 
      ]

      return days[date.getDay()];
   }

   public static fullDate()
   {
      const date = new Date;

      return ` ${date.getDate()} de ${Month.months(date)} de ${date.getFullYear()}`
   }

}