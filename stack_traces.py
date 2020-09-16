import sys
import traceback




def perform_calculation(calc, x, y):
    calc(x, y)


def add(x, y):
    return x + y

def mult(x, y):
    return x * y



def innoc(*_):
    def spelunk():
        raise ValueError('Invalid')
    spelunk()


def calc_dict(d, k1, k2, calc):
    return perform_calculation(calc, d[k1], d[k2])


def comp_calc(x, y, calc):
    return [perform_calculation(calc, x_i, y_i) for x_i, y_i in zip(x, y)]



def run_trace(i: int, f):
    try:
        f()
    except Exception:
        print(f'Traceback Problem {i}\n===================', file=sys.stderr)
        traceback.print_exc()
        print('\n', file=sys.stderr)




run_trace(1, lambda: perform_calculation(add, '1', 3))
run_trace(2, lambda: perform_calculation(add, 7, '3'))
run_trace(3, lambda: perform_calculation(mult, '3', '3'))
run_trace(4, lambda: perform_calculation(mult, [4], [3]))
run_trace(5, lambda: perform_calculation(innoc, '1', 3))
run_trace(6, lambda: comp_calc([1, 2, 3], 1, add))
run_trace(7, lambda: comp_calc([1, 2, [3]], [4, 5, 6], add))
run_trace(8, lambda: calc_dict({'one': 1, 'two': '2'}, 'one', 'two', add))
run_trace(9, lambda: calc_dict({}, 'one', 'two', add))
