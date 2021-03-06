interface ObjectName 
{
  path:string;
  name:string;
}

class Day {

  public static getDayOfWeek(date:string) :ObjectName
  {
    return Day.convertInObject(date);
  }

  private static getDay(date:string) :string
  {
    const days = [
      'Domingo',
      'Segunda',
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"
    ];

    return days[new Date(date).getDay()];
  }

  private static convertInObject(date:string) :ObjectName
  {
    const lower = Day.getDay(date)
     .toLowerCase()
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, "");
    
    return {
      path: lower,
      name: Day.getDay(date)
    } as ObjectName;
  }

}

export { Day };