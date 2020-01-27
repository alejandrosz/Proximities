function namesSorter(departmentsArray) {
    return departmentsArray.forEach(department =>
      department.sort(function(a, b) {
        if (a.length === b.length) {
          if (a.localeCompare(b)) {
            return -1;
          } else {
            return 1;
          }
        } else if (b.length < a.length) {
          return -1;
        } else if (b.length > a.lenght) {
          return 1;
        }
      }),
    );
  }

    function namesSorter (departmentsArray) {
        let flated = departmentsArray.flat()
        let sorted = flated.sort(function(a, b) {
            if (a.length === b.length) {
              if (a.localeCompare(b)) {
                return -1;
              } else {
                return 1;
              }
            } else if (b.length < a.length) {
              return -1;
            } else if (b.length > a.lenght) {
              return 1;
            }
          })
          return sorted
    }

    function namesSorter (departmentsArray) {
        let flated = departmentsArray.reduce((acc, val) => acc.concat(val)
        let sorted = flated.sort(function(a, b) {
            if (a.length === b.length) {
              if (a.localeCompare(b)) {
                return -1;
              } else {
                return 1;
              }
            } else if (b.length < a.length) {
              return -1;
            } else if (b.length > a.lenght) {
              return 1;
            }
          })
          return sorted
    }